import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowDropleft, IoIosArrowDroprightCircle } from "react-icons/io";

export default function TopHeader() {
  const [show, setShow] = useState<boolean>(true);
  return (
    <div className="p-4 shadow-lg flex items-center justify-between">
      <div className="flex items-center gap-10">
        {show ? (
          <IoIosArrowDropleft
            className="text-2xl cursor-pointer"
            onClick={() => setShow(!show)}
          />
        ) : (
          <IoIosArrowDroprightCircle
            className="text-2xl cursor-pointer"
            onClick={() => setShow(!show)}
          />
        )}
      </div>
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">Dilmurod</h1>
        <FaRegUserCircle className="text-4xl" />
      </div>
    </div>
  );
}
