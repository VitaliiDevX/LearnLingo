import InputField from "../InputField/InputField";

export default function LoginForm() {
  return (
    <>
      <InputField name="email" placeholder="Email" />
      <InputField
        name="password"
        placeholder="Password"
        type="password"
        autoComplete="current-password"
      />
    </>
  );
}
