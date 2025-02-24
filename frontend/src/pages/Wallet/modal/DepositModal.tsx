import { useState } from "react";
import Modal from "@/components/Modal/Modal";
import DepositWithAXBModal from "./DepositWithAXBModal";
import "./DepositAndWithdrawModal.scss";
import DepositBuyAXBModal from "./DepositBuyAXBModal";

type DepositModalProps = {
  open: boolean;
  onCancel: (open: boolean) => void;
  onBuy?: () => void
};

const DepositModal = (props: DepositModalProps) => {
  const [openDepositWithAXBModal, setOpenDepositWithAXBModal] = useState(false);
  const [openDepositBuyAXBModal, setOpenDepositBuyAXBModal] = useState(false);

  return (
    <>
      <Modal
        title="Choose option deposit"
        open={props.open}
        onCancel={() => props.onCancel(false)}
        className="wallet-modal wallet-modal__deposit"
      >
        <div className="wallet-modal-content">
          <img
            src={require("@/assets/images/deposit.png")}
            alt="Deposit"
          />
          <div className="wallet-modal-group-btn">
            <button
              className="wallet-modal-btn wallet-modal-btn__dark"
              onClick={() => setOpenDepositWithAXBModal(true)}
            >
              Deposit with AXB
            </button>
            <button
              className="wallet-modal-btn wallet-modal-btn__light"
              onClick={() => setOpenDepositBuyAXBModal(true)}
            >
              Buy AXB
            </button>
          </div>
        </div>
      </Modal>
      <DepositWithAXBModal
        open={openDepositWithAXBModal}
        onCancel={setOpenDepositWithAXBModal}
      />
      <DepositBuyAXBModal
        open={openDepositBuyAXBModal}
        onCancel={setOpenDepositBuyAXBModal}
        onHandleBuy={props.onBuy}
      />
    </>
  );
};

export default DepositModal;
