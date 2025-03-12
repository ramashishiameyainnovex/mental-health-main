import User from "../models/userModel.js";

export const getMoods = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) return res.status(404).json({ message: 'User not found' });
    
        const moods = await Mood.find({ user: user._id });
        res.json(moods);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

export const createMood = async (req, res) => {
    try {
      const moodData = {
        mood: req.body.mood,
        emoji: req.body.emoji,
        color: req.body.color || 'blue',
        types: req.body.types,
        musicLinks: req.body.musicLinks,
        videoLinks: req.body.videoLinks,
        contentLinks: req.body.contentLinks
      };
  
      const newMood = new Mood(moodData);
      const savedMood = await newMood.save();
      res.status(201).json(savedMood);

      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}