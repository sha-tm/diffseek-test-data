import { useState } from "react";

type Props = {
  onToken: (token: string) => void;
};

export function CardTokenField({ onToken }: Props) {
  const [value, setValue] = useState("");
  return (
    <label className="card-token-field">
      <span>Card details</span>
      <input
        inputMode="numeric"
        autoComplete="cc-number"
        placeholder="Card number"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          if (event.target.value.length >= 16) {
            onToken(`tok_${event.target.value.slice(-4)}`);
          }
        }}
      />
    </label>
  );
}
