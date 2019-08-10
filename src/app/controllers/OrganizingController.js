import Meetup from '../models/Meetup';
import File from '../models/File';

class OrganizingController {
  async index(req, res) {
    const meetups = await Meetup.findAll({
      where: { user_id: req.userId },
    });

    return res.json(meetups);
  }

  async show(req, res) {
    const meetup = await Meetup.findByPk(req.params.id, {
      include: [
        {
          model: File,
          as: 'file',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (meetup.user_id !== req.userId) {
      return res.status(400).json({ erro: 'Unauthorized' });
    }

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not found' });
    }

    return res.json({
      meetup,
    });
  }
}

export default new OrganizingController();
