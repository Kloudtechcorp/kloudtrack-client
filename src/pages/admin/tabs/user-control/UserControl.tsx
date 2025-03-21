import { UserTables } from "@/pages/admin/tabs/user-control/components/UserTables";

const UserControl = () => {
  return (
    <div className="px-5 w-full">
      <span className="flex pt-5 font-bold text-lg">User List</span>
      <span className="flex pb-5 text-sm">
        This page will display the list of users as well as their roles and
        stations granted.
      </span>
      <div className="w-full overflow-auto rounded-xl custom-scrollbar">
        <UserTables />
      </div>
    </div>
  );
};

export default UserControl;
