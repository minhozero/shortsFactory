import { requireAuth } from "@/lib/auth-utils"

const Page = async () => {
    await requireAuth()

    return <p>실행</p>
}

export default Page