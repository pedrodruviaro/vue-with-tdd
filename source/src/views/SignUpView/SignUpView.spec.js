import SignUpView from '@/views/SignUpView/SignUpView.vue';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/vue';
import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';

describe('Sign Up', () => {
  it('has Sign Up header', () => {
    render(SignUpView);
    const header = screen.getByRole('heading', {
      name: 'Sign Up'
    });
    expect(header).toBeInTheDocument();
  });

  it('has unsername input', () => {
    render(SignUpView);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('has email input', () => {
    render(SignUpView);
    expect(screen.getByLabelText('E-Mail')).toBeInTheDocument();
  });

  it('has password input', () => {
    render(SignUpView);
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('has password type for password input', () => {
    render(SignUpView);
    expect(screen.getByLabelText('Password'))
      .toBeInTheDocument()
      .toHaveAttribute('type', 'password');
  });

  it('has password repeat input', () => {
    render(SignUpView);
    expect(screen.getByLabelText('Password Repeat')).toBeInTheDocument();
  });

  it('has password type for password input', () => {
    render(SignUpView);
    expect(screen.getByLabelText('Password Repeat'))
      .toBeInTheDocument()
      .toHaveAttribute('type', 'password');
  });

  it('has a Sign Up button', () => {
    render(SignUpView);
    const button = screen.getByRole('button', {
      name: 'Sign Up'
    });
    expect(button).toBeInTheDocument();
  });

  it('disables the button initially', () => {
    render(SignUpView);
    expect(
      screen.getByRole('button', {
        name: 'Sign Up'
      })
    ).toBeDisabled();
  });

  describe('when user sets same value for password inputs', () => {
    it('enables button', async () => {
      const user = userEvent.setup();

      render(SignUpView);
      const passwordInput = screen.getByLabelText('Password');
      const passwordRepeatInput = screen.getByLabelText('Password Repeat');

      await user.type(passwordInput, 'P4ssw0rd');
      await user.type(passwordRepeatInput, 'P4ssw0rd');

      expect(
        screen.getByRole('button', {
          name: 'Sign Up'
        })
      ).toBeEnabled();
    });

    describe('when user submits form', () => {
      it('sends username, email and password to backend', async () => {
        let requestBody;
        const server = setupServer(
          http.post('/api/v1/users', async ({ request }) => {
            requestBody = await request.json();
            return HttpResponse.json({});
          })
        );
        server.listen();

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

        await waitFor(() => {
          expect(requestBody).toEqual({
            username: 'user1',
            email: 'user1@email.com',
            password: 'P4ssw0rd'
          });
        });
      });
    });
  });
});
