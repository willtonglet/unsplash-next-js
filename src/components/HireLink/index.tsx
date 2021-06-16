import React from 'react';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

const HireLink = (): React.ReactElement => {
  return (
    <div className="flex items-center">
      <span className="text-xs font-light">Available for hire</span>
      <IoMdCheckmarkCircleOutline size={12} className="ml-1" />
    </div>
  );
};

export default React.memo(HireLink);
