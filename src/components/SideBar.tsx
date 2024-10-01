import { SideBarButton } from "./SideBarButton";
import { House, Megaphone, MessageSquareMore } from "lucide-react"

export function SideBar() {
    return (
        <aside className="fixed bottom-0 left-0 w-full border-t-2 border-border py-2">
            <div className="flex items-center justify-between">
                <SideBarButton name="Chats" link="/">
                    <MessageSquareMore size={24} />
                </SideBarButton>

                <SideBarButton name="Profile" link="/profile">
                    <House size={24} />
                </SideBarButton>

                <SideBarButton name="Broadcast" link="/broadcast">
                    <Megaphone size={24} />
                </SideBarButton>
            </div>
        </aside>
    )
}

