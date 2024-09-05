vi.mock('axios');
import SignUpView from '@/views/SignUpView/SignUpView.vue';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/vue';
import axios from 'axios';

describe('Sign Up', () => {
  describe('when user sets same value for password inputs', () => {
    describe('when user submits form', () => {
      it('sends username, email and password to backend', async () => {
        const user = userEvent.setup();

        render(SignUpView);
        const usernameInput = screen.getByLabelText('Username');
        const emailInput = screen.getByLabelText('E-Mail');
        const passwordInput = screen.getByLabelText('Password');
        const passwordRepeatInput = screen.getByLabelText('Password Repeat');

        await user.type(usernameInput, 'user1');
        await user.type(emailInput, 'user1@email.com');
        await user.type(passwordInput, 'P4ssw0rd');
        await user.type(passwordRepeatInput, 'P4ssw0rd');

        const button = screen.getByRole('button', {
          name: 'Sign Up'
        });

        await user.click(button);

        expect(axios.post).toHaveBeenCalledWith('/api/v1/users', {
          username: 'user1',
          email: 'user1@email.com',
          password: 'P4ssw0rd'
        });
      });
    });
  });
});
