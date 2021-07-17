interface PhotoRelatedTitleWithChildrenProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}

const PhotoRelatedTitleWithChildren = ({
  title,
  children,
  className,
}: PhotoRelatedTitleWithChildrenProps): React.ReactElement => {
  return (
    <div className={className}>
      <h3 className="text-lg mb-6">{title}</h3>
      {children}
    </div>
  );
};

export default PhotoRelatedTitleWithChildren;
