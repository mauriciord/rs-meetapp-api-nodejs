import Mail from '../../lib/Mail';

class NewSubscriptionMail {
  get key() {
    return 'NewSubscriptionMail';
  }

  async handle({ data }) {
    const { meetup, user } = data;

    await Mail.sendMail({
      to: `${meetup.User.name} <${meetup.User.email}>`,
      subject: `[${meetup.title}] Nova inscrição`,
      template: 'newsubscription',
      context: {
        organizer: meetup.User.name,
        meetup: meetup.title,
        user: user.name,
        email: user.email,
      },
    });
  }
}

export default new NewSubscriptionMail();
