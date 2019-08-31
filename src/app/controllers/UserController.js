import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required('name field is required'),
      email: Yup.string()
        .email('invalid email')
        .required('email field is required'),
      password: Yup.string()
        .min(6, 'Passwords must be at least 6 characters long')
        .required('password field is required'),
    });

    schema
      .validate(req.body)
      .catch(e => res.status(400).json({ error: e.message }));

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email('invalid email'),
      oldPassword: Yup.string().min(
        6,
        'Passwords must be at least 6 characters long'
      ),
      password: Yup.string()
        .min(6, 'Passwords must be at least 6 characters long')
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password
          ? field
              .required()
              .oneOf([Yup.ref('password')], 'confirm password does not match')
          : field
      ),
    });

    schema
      .validate(req.body)
      .catch(e => res.status(400).json({ error: e.message }));

    const { email, old_password } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (old_password && !(await user.checkPassword(old_password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({ id, name, email, provider });
  }
}

export default new UserController();
