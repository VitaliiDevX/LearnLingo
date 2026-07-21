import InputField from "../InputField/InputField";

export default function RegisterForm() {
  return (
    <>
      <InputField name="name" placeholder="Name" />
      <InputField name="email" placeholder="Email" />
      <InputField
        name="password"
        placeholder="Password"
        type="password"
        autoComplete="new-password"
      />
    </>
  );
}
