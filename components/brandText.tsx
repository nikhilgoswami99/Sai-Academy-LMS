interface BrandTextProps {
  text: string;
}

export function BrandText({ text }: BrandTextProps) {
  return text.split(/(SAI Academy)/gi).map((part, index) =>
    /^SAI Academy$/i.test(part) ? (
      <span className="brand-wordmark" key={`${part}-${index}`}>
        SAI ACADEMY
      </span>
    ) : (
      part
    ),
  );
}
