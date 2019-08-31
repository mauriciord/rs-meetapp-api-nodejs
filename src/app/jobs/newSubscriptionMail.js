import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale';
import Mail from '../../lib/Mail';

class NewSubscriptionMail {
  get key() {
    return 'NewSubscriptionMail';
  }

  async handle({ data }) {
    const { meetup, user } = data;

    await Mail.sendMail({
      to: `${meetup.User.name} <${meetup.User.email}>`,
      subject: `Nova inscrição em ${meetup.title}`,
      template: 'subscription',
      context: {
        meetupCreator: meetup.User.name,
        meetup_title: meetup.title,
        user: user.name,
        date: format(
          parseISO(meetup.date),
          "dd 'de' MMMM' de ' yyyy', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new NewSubscriptionMail();
