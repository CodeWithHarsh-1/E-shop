import Image from "next/image";
interface AvatarProps{
    src? : string | null | undefined;

}
import { FaUserCircle } from "react-icons/fa";


const Avatar: React.FC<AvatarProps> = ({src}) => {
    if (src) {
      return ( <Image
        src={src}
        alt="Avatar"
        className="rounded-full"
        height={30}
        width={30}
      />
      )
    }
    return <FaUserCircle size-24 />;
}
 
export default Avatar;