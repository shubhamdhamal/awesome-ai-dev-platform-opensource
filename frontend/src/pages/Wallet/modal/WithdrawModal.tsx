import { useState, useEffect } from "react";
// import Modal from "@/components/Modal/Modal";
import WithdrawWithAXBModal from "./WithdrawWithAXBModal";
import WithdrawWithFiatModal from "./WithdrawWithFiatModal";
import "./DepositAndWithdrawModal.scss";

type WithdrawModalProps = {
  open: boolean;
  onCancel: (open: boolean) => void;
};

const WithdrawModal = (props: WithdrawModalProps) => {
  // const [openWithdrawWithAXBModal, setOpenWithdrawWithAXBModal] =
  //   useState(false);
  // const [openWithdrawWithFiatModal, setOpenWithdrawWithFiatModal] =
  //   useState(false);

  const [openWithdrawWithAXBModal, setOpenWithdrawWithAXBModal] = useState(false);
  const [openWithdrawWithFiatModal, setOpenWithdrawWithFiatModal] = useState(false);

  useEffect(() => {
    if (props.open) {
      setOpenWithdrawWithAXBModal(true);
    } else {
      setOpenWithdrawWithAXBModal(false);
      setOpenWithdrawWithFiatModal(false);
    }
  }, [props.open]);
  return (
      <>
        <WithdrawWithAXBModal
          open={openWithdrawWithAXBModal}
          onCancel={(open) => {
            setOpenWithdrawWithAXBModal(open);
            props.onCancel(open);
          }}
        />
        <WithdrawWithFiatModal
          open={openWithdrawWithFiatModal}
          onCancel={setOpenWithdrawWithFiatModal}
        />
      </>
    );
  // return (
  //   <>
  //     <Modal
  //       title="Choose options withdraw"
  //       open={props.open}
  //       onCancel={() => props.onCancel(false)}
  //       className="wallet-modal wallet-modal__withdraw"
  //     >
  //       <div className="wallet-modal-content">
  //         <img
  //           src={require("@/assets/images/withdraw.png")}
  //           alt="Withdraw"
  //         />
  //         <div className="wallet-modal-group-btn">
  //           <button
  //             className="wallet-modal-btn wallet-modal-btn__light"
  //             disabled={true}
  //             onClick={() => setOpenWithdrawWithFiatModal(true)}
  //           >
  //             Fiat
  //           </button>
  //           <button
  //             className="wallet-modal-btn wallet-modal-btn__dark"
  //             onClick={() => setOpenWithdrawWithAXBModal(true)}
  //           >
  //             Crypto
  //           </button>
  //         </div>
  //       </div>
  //     </Modal>
  //     <WithdrawWithAXBModal
  //       open={openWithdrawWithAXBModal}
  //       onCancel={setOpenWithdrawWithAXBModal}
  //     />
  //     <WithdrawWithFiatModal
  //       open={openWithdrawWithFiatModal}
  //       onCancel={setOpenWithdrawWithFiatModal}
  //     />
  //   </>
  // );
};

export default WithdrawModal;
