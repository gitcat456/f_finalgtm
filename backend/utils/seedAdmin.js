import User from '../models/User.js';

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ username: 'gtm_admin' });
    if (!adminExists) {
      const admin = new User({
        username: 'gtm_admin',
        password: 'gtm@2026',
        role: 'admin',
      });
      await admin.save();
      console.log('Default admin account seeded successfully (username: gtm_admin)');
    } else {
      console.log('Admin account already exists, seeding skipped.');
    }
  } catch (error) {
    console.error(`Error seeding admin user: ${error.message}`);
  }
};

export default seedAdmin;
