import SignUpView from '@/views/SignUpView/SignUpView.vue'
import { render, screen } from '@testing-library/vue'

describe('Sign Up', () => {
  it('has Sign Up header', () => {
    render(SignUpView)
    const header = screen.getByRole('heading', {
      name: 'Sign Up'
    })
    expect(header).toBeInTheDocument()
  })
})
