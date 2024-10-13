import logo from '/assets/logo.svg';

export default function Logo({ size = 20 }: { size?: number }) {
  return <img src={logo} alt="Bootplay logo" className={`size-${size}`} data-testid='logo' />;
}
