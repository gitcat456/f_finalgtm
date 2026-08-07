import Visit from '../models/Visit.js';
import ApiError from '../utils/ApiError.js';
import { PerfTimer } from '../utils/performanceLogger.js';

/**
 * @desc    Record a website page visit (No PII collected)
 * @route   POST /api/analytics/track
 * @access  Public
 */
export const trackVisit = async (req, res, next) => {
  const timer = new PerfTimer('/api/analytics/track');
  try {
    const { visitorId, isReturning, page, referrer, deviceType, browser, os } = req.body;

    if (!visitorId || !page) {
      return next(new ApiError(400, 'visitorId and page are required'));
    }

    const validDeviceTypes = ['desktop', 'mobile', 'tablet'];
    const normalizedDevice = validDeviceTypes.includes(deviceType) ? deviceType : 'desktop';

    const visit = await timer.measureDb(() =>
      Visit.create({
        visitorId: String(visitorId).substring(0, 100),
        isReturning: Boolean(isReturning),
        page: String(page).substring(0, 200),
        referrer: String(referrer || 'Direct').substring(0, 200),
        deviceType: normalizedDevice,
        browser: String(browser || 'Unknown').substring(0, 100),
        os: String(os || 'Unknown').substring(0, 100),
        timestamp: new Date(),
      })
    );

    return timer.sendJsonResponse(
      res,
      201,
      {
        status: 'success',
        message: 'Visit tracked successfully',
        data: { id: visit._id },
      },
      req.method
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get aggregated visitor analytics stats for admin dashboard
 * @route   GET /api/analytics/stats
 * @access  Private (Protected Admin)
 */
export const getAnalyticsStats = async (req, res, next) => {
  const timer = new PerfTimer('/api/analytics/stats');
  try {
    const { period = '7d' } = req.query;

    let startDate = new Date();
    if (period === '24h') {
      startDate.setHours(startDate.getHours() - 24);
    } else if (period === '30d') {
      startDate.setDate(startDate.getDate() - 30);
    } else if (period === 'all') {
      startDate = new Date(0); // Beginning of epoch
    } else {
      // Default: 7 days
      startDate.setDate(startDate.getDate() - 7);
    }

    const matchFilter = { timestamp: { $gte: startDate } };

    // Parallel aggregate queries
    const [
      totalVisitsCount,
      uniqueVisitorsResult,
      returningVisitorsResult,
      deviceStats,
      browserStats,
      osStats,
      topPagesStats,
      topReferrersStats,
      recentVisits,
      dailyTrendStats,
    ] = await timer.measureDb(() =>
      Promise.all([
        // 1. Total Visits
        Visit.countDocuments(matchFilter),

        // 2. Unique Visitors (distinct visitorIds)
        Visit.distinct('visitorId', matchFilter),

        // 3. Returning Visitors (distinct visitorIds marked as returning or appearing > 1 times)
        Visit.distinct('visitorId', { ...matchFilter, isReturning: true }),

        // 4. Device Breakdown
        Visit.aggregate([
          { $match: matchFilter },
          { $group: { _id: '$deviceType', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
        ]),

        // 5. Browser Breakdown
        Visit.aggregate([
          { $match: matchFilter },
          { $group: { _id: '$browser', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 8 },
        ]),

        // 6. OS Breakdown
        Visit.aggregate([
          { $match: matchFilter },
          { $group: { _id: '$os', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 8 },
        ]),

        // 7. Top Pages
        Visit.aggregate([
          { $match: matchFilter },
          { $group: { _id: '$page', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 10 },
        ]),

        // 8. Top Referrers
        Visit.aggregate([
          { $match: matchFilter },
          { $group: { _id: '$referrer', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 10 },
        ]),

        // 9. Recent Visits Log (No PII)
        Visit.find(matchFilter)
          .sort({ timestamp: -1 })
          .limit(20)
          .select('-__v')
          .lean(),

        // 10. Daily Trend
        Visit.aggregate([
          { $match: matchFilter },
          {
            $group: {
              _id: {
                $dateToString: { format: '%Y-%m-%d', date: '$timestamp' },
              },
              count: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
        ]),
      ])
    );

    const totalVisits = totalVisitsCount || 0;
    const uniqueVisitors = uniqueVisitorsResult.length || 0;
    const returningVisitors = returningVisitorsResult.length || 0;

    return timer.sendJsonResponse(
      res,
      200,
      {
        status: 'success',
        data: {
          period,
          summary: {
            totalVisits,
            uniqueVisitors,
            returningVisitors,
            returningRate: uniqueVisitors ? Math.round((returningVisitors / uniqueVisitors) * 100) : 0,
          },
          deviceBreakdown: deviceStats.map((item) => ({
            name: item._id,
            count: item.count,
            percentage: totalVisits ? Math.round((item.count / totalVisits) * 100) : 0,
          })),
          browserBreakdown: browserStats.map((item) => ({
            name: item._id,
            count: item.count,
            percentage: totalVisits ? Math.round((item.count / totalVisits) * 100) : 0,
          })),
          osBreakdown: osStats.map((item) => ({
            name: item._id,
            count: item.count,
            percentage: totalVisits ? Math.round((item.count / totalVisits) * 100) : 0,
          })),
          topPages: topPagesStats.map((item) => ({
            page: item._id,
            visits: item.count,
          })),
          topReferrers: topReferrersStats.map((item) => ({
            referrer: item._id,
            count: item.count,
          })),
          dailyTrend: dailyTrendStats.map((item) => ({
            date: item._id,
            visits: item.count,
          })),
          recentVisits,
        },
      },
      req.method
    );
  } catch (error) {
    next(error);
  }
};
