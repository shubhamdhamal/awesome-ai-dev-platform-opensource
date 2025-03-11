import {useState, useEffect, useCallback} from "react";
// import Modal from "@/components/Modal/Modal";
import DepositWithAXBModal from "./DepositWithAXBModal";
import "./DepositAndWithdrawModal.scss";
import DepositBuyAXBModal from "./DepositBuyAXBModal";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import { toastError } from "@/utils/toast";

type DepositModalProps = {
  open: boolean;
  walletAddress: string;
  onCancel: (open: boolean) => void;
  onBuy?: () => void;
};

const DepositModal = (props: DepositModalProps) => {
  const [openDepositWithAXBModal, setOpenDepositWithAXBModal] = useState(false);
  const [openDepositBuyAXBModal, setOpenDepositBuyAXBModal] = useState(false);
  const { status } = useWeb3Auth();

  const onOpenDepositWithAXBModal = useCallback(() => {
    if (status === "connected") {
      setOpenDepositWithAXBModal(true);
    } else {
      toastError("Wallet is not connected yet. Please connect your wallet.");
    }
  }, [status]);

  // Khi props.open là true, tự động mở modal DepositWithAXBModal (crypto)
  useEffect(() => {
    if (props.open) {
      onOpenDepositWithAXBModal();
    } else {
      setOpenDepositWithAXBModal(false);
      setOpenDepositBuyAXBModal(false);
    }
  }, [onOpenDepositWithAXBModal, props.open, status]);

  return (
    <>
      {/*
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
              onClick={() => onOpenDepositWithAXBModal()}
            >
              Deposit with crypto
            </button>
            {/* <button
              className="wallet-modal-btn wallet-modal-btn__light"
              onClick={() => setOpenDepositBuyAXBModal(true)}
            >
              Buy AXB
            </button> 
          </div>
        </div>
      </Modal>
      */}
      <DepositWithAXBModal
        open={openDepositWithAXBModal}
        onCancel={(open) => {
          setOpenDepositWithAXBModal(open);
          props.onCancel(open);
        }}
        walletAddress={props.walletAddress}
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
