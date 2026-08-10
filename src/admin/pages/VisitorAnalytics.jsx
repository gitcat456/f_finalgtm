import { useState, useEffect, useCallback } from 'react';
import { analyticsService } from '../services/analyticsService';
import { useNotification } from '../context/NotificationContext';
import { FadeIn } from '../../components/skeletons/Skeleton';

import TrendingUpIcon from '@mui/icons-material/TrendingUpOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import ComputerIcon from '@mui/icons-material/Computer';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import TabletIcon from '@mui/icons-material/Tablet';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import RefreshIcon from '@mui/icons-material/RefreshOutlined';

export default function VisitorAnalytics() {
  const [period, setPeriod] = useState('7d');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  const { showError } = useNotification();

  const fetchStats = useCallback(
    async (selectedPeriod = period) => {
      setLoading(true);
      try {
        const data = await analyticsService.getAnalyticsStats(selectedPeriod);
        setStats(data);
      } catch (err) {
        showError(err.message || 'Failed to load visitor analytics.');
      } finally {
        setLoading(false);
      }
    },
    [period, showError]
  );

  useEffect(() => {
    fetchStats(period);
  }, [period, fetchStats]);

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
  };

  const getDeviceIcon = (device) => {
    switch (device?.toLowerCase()) {
      case 'mobile':
        return <SmartphoneIcon fontSize="small" className="text-emerald-500" />;
      case 'tablet':
        return <TabletIcon fontSize="small" className="text-amber-500" />;
      default:
        return <ComputerIcon fontSize="small" className="text-indigo-500" />;
    }
  };

  return (
    <div className="admin-page-container">
      {/* Page Header */}
      <div className="admin-page-header flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="admin-page-title">Visitor Analytics</h1>
          <p className="admin-page-subtitle">
            Real-time, privacy-first website traffic metrics and audience insights.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Period selector */}
          <div className="bg-white border border-gray-200 rounded-xl p-1 flex items-center shadow-xs">
            {[
              { label: '24h', value: '24h' },
              { label: '7 Days', value: '7d' },
              { label: '30 Days', value: '30d' },
              { label: 'All Time', value: 'all' },
            ].map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => handlePeriodChange(p.value)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${period === p.value
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => fetchStats(period)}
            className="admin-btn admin-btn-secondary p-2 flex items-center gap-1 text-sm font-medium"
            title="Refresh Data"
          >
            <RefreshIcon fontSize="small" className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Privacy Notice Banner */}
      <div className="bg-gradient-to-r from-emerald-900/10 via-emerald-800/5 to-teal-900/10 border border-emerald-200/80 rounded-2xl p-4 mb-6 flex items-start gap-3 text-emerald-900 shadow-xs">
        <ShieldOutlinedIcon className="text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-xs md:text-sm">
          <span className="font-semibold block text-emerald-950 mb-0.5">
            Privacy & Data Protection Compliant
          </span>
          All tracking metrics are strictly anonymous and aggregate. No personally identifiable information (PII) such as names, emails, passwords, or exact IP addresses are ever collected or stored.
        </div>
      </div>

      {loading && !stats ? (
        <div className="space-y-6 animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      ) : (
        <FadeIn>
          {/* Main KPI Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Total Visits */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Total Page Visits
                </span>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <TrendingUpIcon />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {stats?.summary?.totalVisits ?? 0}
              </div>
              <p className="text-xs text-gray-500 mt-2">Total page views in selected period</p>
            </div>

            {/* Unique Visitors */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Unique Visitors
                </span>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <PeopleOutlineIcon />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {stats?.summary?.uniqueVisitors ?? 0}
              </div>
              <p className="text-xs text-gray-500 mt-2">Distinct anonymous visitor devices</p>
            </div>

            {/* Returning Visitors */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Returning Visitors
                </span>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <AutorenewOutlinedIcon />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {stats?.summary?.returningVisitors ?? 0}
              </div>
              <p className="text-xs text-gray-500 mt-2">Visitors who returned for repeat visits</p>
            </div>

            {/* Returning Rate % */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Returning Rate
                </span>
                <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                  <PersonAddOutlinedIcon />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {stats?.summary?.returningRate ?? 0}%
              </div>
              <p className="text-xs text-gray-500 mt-2">Ratio of returning vs total unique</p>
            </div>
          </div>

          {/* Breakdown Section: Devices, Browsers, OS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Device Type */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
              <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ComputerIcon className="text-indigo-600" fontSize="small" /> Device Types
              </h3>
              {stats?.deviceBreakdown?.length ? (
                <div className="space-y-4">
                  {stats.deviceBreakdown.map((device) => (
                    <div key={device.name}>
                      <div className="flex justify-between text-xs font-medium text-gray-700 mb-1 capitalize">
                        <span className="flex items-center gap-1.5">
                          {getDeviceIcon(device.name)} {device.name}
                        </span>
                        <span>
                          {device.count} ({device.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${device.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 py-4 text-center">No device data recorded yet.</p>
              )}
            </div>

            {/* Browsers */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
              <h3 className="text-base font-bold text-gray-900 mb-4">Browsers</h3>
              {stats?.browserBreakdown?.length ? (
                <div className="space-y-4">
                  {stats.browserBreakdown.map((b) => (
                    <div key={b.name}>
                      <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                        <span>{b.name}</span>
                        <span>
                          {b.count} ({b.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${b.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 py-4 text-center">No browser data recorded yet.</p>
              )}
            </div>

            {/* Operating Systems */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
              <h3 className="text-base font-bold text-gray-900 mb-4">Operating Systems</h3>
              {stats?.osBreakdown?.length ? (
                <div className="space-y-4">
                  {stats.osBreakdown.map((osItem) => (
                    <div key={osItem.name}>
                      <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                        <span>{osItem.name}</span>
                        <span>
                          {osItem.count} ({osItem.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${osItem.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 py-4 text-center">No OS data recorded yet.</p>
              )}
            </div>
          </div>

          {/* Top Pages & Top Referrers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Top Visited Pages */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
              <h3 className="text-base font-bold text-gray-900 mb-4">Most Visited Pages</h3>
              {stats?.topPages?.length ? (
                <div className="divide-y divide-gray-100">
                  {stats.topPages.map((item) => (
                    <div key={item.page} className="py-2.5 flex items-center justify-between text-xs">
                      <span className="font-mono font-medium text-indigo-700 bg-indigo-50 px-2 py-1 rounded-md">
                        {item.page}
                      </span>
                      <span className="font-semibold text-gray-900">{item.visits} visits</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 py-4 text-center">No page visit data recorded.</p>
              )}
            </div>

            {/* Top Traffic Referrers */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
              <h3 className="text-base font-bold text-gray-900 mb-4">Traffic Sources & Referrers</h3>
              {stats?.topReferrers?.length ? (
                <div className="divide-y divide-gray-100">
                  {stats.topReferrers.map((item) => (
                    <div key={item.referrer} className="py-2.5 flex items-center justify-between text-xs">
                      <span className="font-medium text-gray-800">{item.referrer}</span>
                      <span className="font-semibold text-gray-900">{item.count} referrals</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 py-4 text-center">No referrer data recorded.</p>
              )}
            </div>
          </div>

          {/* Recent Visitor Activity Log */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900">Recent Activity Stream</h3>
              <span className="text-xs text-gray-500 font-medium">Last 20 events</span>
            </div>

            {stats?.recentVisits?.length ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                      <th className="pb-3">Timestamp</th>
                      <th className="pb-3">Page Visited</th>
                      <th className="pb-3">Device</th>
                      <th className="pb-3">Browser / OS</th>
                      <th className="pb-3">Referrer</th>
                      <th className="pb-3 text-right">Visitor Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {stats.recentVisits.map((visit) => (
                      <tr key={visit._id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-3 text-gray-600 font-mono">
                          {new Date(visit.timestamp).toLocaleString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })}
                        </td>
                        <td className="py-3 font-semibold text-gray-900 font-mono">{visit.page}</td>
                        <td className="py-3 capitalize flex items-center gap-1 text-gray-700">
                          {getDeviceIcon(visit.deviceType)} {visit.deviceType}
                        </td>
                        <td className="py-3 text-gray-700">
                          {visit.browser} / {visit.os}
                        </td>
                        <td className="py-3 text-gray-600">{visit.referrer}</td>
                        <td className="py-3 text-right">
                          <span
                            className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${visit.isReturning
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                              }`}
                          >
                            {visit.isReturning ? 'Returning' : 'New'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-gray-400 py-6 text-center">No recent visits recorded.</p>
            )}
          </div>
        </FadeIn>
      )}
    </div>
  );
}
