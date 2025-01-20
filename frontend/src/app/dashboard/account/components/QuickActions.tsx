import { memo } from "react";
import IconBubble from "@/components/ui/IconBubble";
import { FaArrowUp } from "react-icons/fa6";
import { COLOR, TRANSACTION_TYPES } from "@/lib/config/constants";

interface QuickActionsProps {
  onCreateTransaction: (type: TRANSACTION_TYPES) => void;
}

export const QuickActions = memo(
  ({ onCreateTransaction }: QuickActionsProps) => (
    <div className="absolute bottom-5 right-5 flex flex-col gap-3 opacity-70">
      <IconBubble
        className="w-9 h-9 bg-success/25 hover:bg-success/55 cursor-pointer hover:scale-125 transition"
        icon={
          <FaArrowUp
            size={12}
            color={COLOR.SUCCESS}
            onClick={() => onCreateTransaction(TRANSACTION_TYPES.DEPOSIT)}
          />
        }
      />
      <IconBubble
        className="w-9 h-9 bg-error/25 hover:bg-error/55 cursor-pointer rotate-180 hover:scale-125"
        icon={
          <FaArrowUp
            size={12}
            color={COLOR.ERROR}
            onClick={() => onCreateTransaction(TRANSACTION_TYPES.PURCHASE)}
          />
        }
      />
    </div>
  )
);

QuickActions.displayName = "QuickActions";
