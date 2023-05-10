import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
    const params = useParams();

    const conversationId = useMemo(() => {
        if (!params?.conversationId) {
            return '';
        }

        return params.useConversationId as string;
    }, [params?.conversationId]);

    // isOpen 이 boolean 이므로 두개의 !! 가 필요함.
    const isOpen = useMemo(() => !!conversationId, [conversationId]);

    return useMemo(() => ({
        isOpen,
        conversationId
    }), [isOpen, conversationId]);
};

export default useConversation