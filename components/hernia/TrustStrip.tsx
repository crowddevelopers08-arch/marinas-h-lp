const items = [
  ["Laparoscopic", "& minimally invasive"],
  ["Faster", "recovery focus"],
  ["Women's", "diastasis recti care"],
  ["Second", "opinions welcome"],
];

export function TrustStrip() {
  return (
    <div className="strip">
      <div className="wrap strip-in">
        {items.map(([strong, label], index) => (
          <FragmentItem key={strong} showDivider={index < items.length - 1}>
            <div className="s">
              <b>{strong}</b> {label}
            </div>
          </FragmentItem>
        ))}
      </div>
    </div>
  );
}

function FragmentItem({
  children,
  showDivider,
}: {
  children: React.ReactNode;
  showDivider: boolean;
}) {
  return (
    <>
      {children}
      {showDivider ? <div className="div" /> : null}
    </>
  );
}
