// pages/api/admin/coupons.js
import Coupon from '@/models/coupon';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Admin creates a new coupon
    const { code, expiresAt } = req.body;
console.log(req.body)
    try {
      const newCoupon = new Coupon({
        code,
        expiresAt: new Date(expiresAt),
      });

      await newCoupon.save();
      return res.status(201).json({ success: true, coupon: newCoupon });
    } catch (error) {
      console.error('Error creating coupon:', error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    console.log('coupn')

    // Admin retrieves all coupons
    try {
      const coupons = await Coupon.find();
      return res.status(200).json({ success: true, coupons });
    } catch (error) {
      console.error('Error fetching coupons:', error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).end(); // Method Not Allowed
  }
}
