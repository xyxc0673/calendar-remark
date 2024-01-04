import clsxm from '../libs/clsxm';

export const InfoCard = ({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={clsxm('p-4 rounded-lg bg-slate-100', className)}>
      {children}
    </div>
  );
};
