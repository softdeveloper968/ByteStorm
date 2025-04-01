import UserNavSide from "@/components/navigation/UserSideNav";
import { FaUser, FaUsers } from "react-icons/fa";
import { FcInvite } from "react-icons/fc";
import { MdArticle, MdSpaceDashboard } from "react-icons/md";

export default async function LendersLayout({ children }) {
  const navigation = [
    {
      name: "Dashboard",
      href: "/lender",
      icon: <MdSpaceDashboard className="h-6 w-6" />,
    },
    {
      name: "Profile",
      href: "/lender/profile",
      icon: <FaUser className="h-6 w-6" />,
    },
    {
      name: "Clients",
      href: "/lender/clients",
      icon: <FaUsers className="h-6 w-6" />,
    },
    {
      name: "Invited",
      href: "/lender/invited",
      icon: <FcInvite className="h-6 w-6" />,
    },
    {
      name: "Submit Article",
      href: "/blogs/post-editor",
      icon: <MdArticle className="h-6 w-6" />,
    },
  ];

  return (
    <div className="flex">
      <UserNavSide navigation={navigation} />
      {children}
    </div>
  );
};
