import { render } from '@testing-library/react';
import Background from '../../components/Background/Background';

describe('Background Component', () => {

  it('should renders children correctly', () => {
    const { getByText } = render(
      <Background className="test-class" childClassName="child-class">
        <div>Test Child</div>
      </Background>
    );
    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('should applies background classes correctly', () => {
    const { container } = render(
      <Background className="test-class bg-test" childClassName="child-class">
        <div>Test Child</div>
      </Background>
    );
    expect(container.firstChild).toHaveClass('bg-test bg-center bg-cover bg-no-repeat test-class');
  });

  it('should applies child classes correctly', () => {
    const { container } = render(
      <Background className="test-class" childClassName="child-class">
        <div>Test Child</div>
      </Background>
    );
    expect(container.firstChild?.firstChild).toHaveClass('flex items-center backdrop-brightness-50 child-class');
  });

  it('should applies blur class when blur is true', () => {
    const { container } = render(
      <Background className="test-class" childClassName="child-class" blur={true}>
        <div>Test Child</div>
      </Background>
    );
    expect(container.firstChild?.firstChild).toHaveClass('justify-center backdrop-blur-sm');
  });

  it('should does not apply blur class when blur is false', () => {
    const { container } = render(
      <Background className="test-class" childClassName="child-class" blur={false}>
        <div>Test Child</div>
      </Background>
    );
    expect(container.firstChild?.firstChild).not.toHaveClass('justify-center backdrop-blur-sm');
  });
});