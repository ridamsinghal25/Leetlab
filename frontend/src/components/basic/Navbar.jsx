import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Code,
  LogOut,
  User,
  PlusCircle,
  SquareActivity,
  ListCheck,
  IndianRupee,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/constants/routes";
import { USER_ROLES } from "@/constants/constants";
import { ModeToggle } from "../theme/ModeToggle";

const MENU_ITEMS = [
  {
    icon: User,
    name: "My Profile",
    route: ROUTES.PROFILE,
  },
  {
    icon: Code,
    name: "Collab Code",
    route: ROUTES.COLLABORATIVE_EDITOR,
  },
  {
    icon: SquareActivity,
    name: "My Activities",
    route: ROUTES.MY_ACTIVITIES,
  },
  {
    icon: ListCheck,
    name: "Quizzes",
    route: ROUTES.QUIZ,
  },
  {
    icon: IndianRupee,
    name: "Pricings",
    route: ROUTES.PRICING,
  },
  {
    icon: Wallet,
    name: "Billing",
    route: ROUTES.BILLING,
  },
];

export default function Navbar() {
  const { authUser, logout } = useAuthStore();

  return (
    <nav className="sticky top-0 z-50 w-full py-3 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between rounded-xl backdrop-blur-lg border bg-background/60 border-transparent">
        {/* Logo Section */}
        <Link to={ROUTES.HOME} className="flex items-center gap-2 py-3 group">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Code className="h-5 w-5 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight hidden sm:block">
            LeetLab
          </span>
        </Link>

        {/* User Menu & Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* User Dropdown */}
          <ModeToggle />

          {authUser && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full p-0 sm:h-10 sm:w-10"
                >
                  <Avatar className="h-9 w-9 sm:h-10 sm:w-10 border-2 border-primary/40 hover:border-primary/60 transition-colors">
                    <AvatarImage
                      src={authUser?.image?.url}
                      alt={authUser?.name || "User"}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {authUser?.name ? authUser.name.charAt(0) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {authUser?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {authUser?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {MENU_ITEMS.map(({ icon: Icon, name, route }) => (
                    <DropdownMenuItem asChild key={name}>
                      <Link to={route} className="cursor-pointer">
                        <Icon className="mr-2 h-4 w-4" />
                        <span>{name}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                {authUser?.role === USER_ROLES.ADMIN && (
                  <>
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link
                          to={ROUTES.ADD_PROBLEM}
                          className="cursor-pointer"
                        >
                          <PlusCircle className="mr-2 h-4 w-4" />
                          <span>Add Problem</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem
                  onClick={() => logout()}
                  className="text-destructive focus:text-destructive cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}
