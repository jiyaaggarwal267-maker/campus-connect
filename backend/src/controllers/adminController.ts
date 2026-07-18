import { Request, Response } from 'express';
import User from '../models/User';
import Event from '../models/Event';
import Registration from '../models/Registration';
import Announcement from '../models/Announcement';

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalEvents = await Event.countDocuments();
    
    const now = new Date();
    const upcomingEvents = await Event.countDocuments({ date: { $gte: now } });
    
    const totalRegistrations = await Registration.countDocuments({ status: 'registered' });

    // Get recent activities (e.g., latest 5 registrations)
    const recentActivities = await Registration.find()
      .sort({ registeredAt: -1 })
      .limit(5)
      .populate('student', 'name')
      .populate('event', 'title');

    res.json({
      totalStudents,
      totalEvents,
      upcomingEvents,
      totalRegistrations,
      recentActivities,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all registrations for admin
// @route   GET /api/admin/registrations
// @access  Private/Admin
export const getAllRegistrations = async (req: Request, res: Response): Promise<void> => {
  try {
    const registrations = await Registration.find()
      .populate('student', 'name email avatar')
      .populate('event', 'title date')
      .sort({ registeredAt: -1 });

    res.json(registrations);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create announcement
// @route   POST /api/admin/announcement
// @access  Private/Admin
export const createAnnouncement = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description } = req.body;
    
    const announcement = new Announcement({
      title,
      description,
      createdBy: req.user?._id,
    });

    const created = await announcement.save();
    res.status(201).json(created);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update announcement
// @route   PUT /api/admin/announcement/:id
// @access  Private/Admin
export const updateAnnouncement = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description } = req.body;
    const announcement = await Announcement.findById(req.params.id);

    if (announcement) {
      announcement.title = title || announcement.title;
      announcement.description = description || announcement.description;

      const updated = await announcement.save();
      res.json(updated);
    } else {
      res.status(404).json({ message: 'Announcement not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete announcement
// @route   DELETE /api/admin/announcement/:id
// @access  Private/Admin
export const deleteAnnouncement = async (req: Request, res: Response): Promise<void> => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (announcement) {
      await announcement.deleteOne();
      res.json({ message: 'Announcement removed' });
    } else {
      res.status(404).json({ message: 'Announcement not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
