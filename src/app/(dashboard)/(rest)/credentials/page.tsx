import { requireAuth } from "@/lib/auth-utils"

const Page = async () => {
    await requireAuth()

    return <p>자격</p>
}

export default Page