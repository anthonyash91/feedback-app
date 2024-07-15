export default function Button({
  children,
  version = "primary",
  type = "button",
  isDisabled = true,
}) {
  return (
    <button type={type} disabled={isDisabled} className={`btn btn-${version}`}>
      {children}
    </button>
  );
}
