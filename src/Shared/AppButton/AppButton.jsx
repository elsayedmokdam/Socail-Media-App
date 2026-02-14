import { Button } from "@heroui/react";

export default function AppButton(x) {
  const { children } = x;
  // console.log(x);
  return (
    <>
      <Button {...x}>{children}</Button>
    </>
  );
}
