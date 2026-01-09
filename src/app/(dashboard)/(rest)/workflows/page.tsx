import { requireAuth } from "@/lib/auth-utils"

const Page = async () => {
    await requireAuth()

    return <p>워크 플로우1</p>
}

export default Page