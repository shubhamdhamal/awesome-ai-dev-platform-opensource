import { useCallback, useRef, useState } from "react";
import IconArrowLeft from "@/assets/icons/IconArrowLeft";
import IconArrowLeftBold from "@/assets/icons/IconArrowLeftBold";
import Modal from "@/components/Modal/Modal";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import WithdrawSuccessModal from "./WithdrawSuccessModal";
import "./WithdrawWithAXBModal.scss";

type WithdrawWithAXBModalProps = {
  open: boolean;
  onCancel: (open: boolean) => void;
};

const WithdrawWithAXBModal = (props: WithdrawWithAXBModalProps) => {
  const [openWithdrawSuccessModal, setOpenWithdrawSuccessModal] =
    useState(false);
  const [isShowOptions, setIsShowOptions] = useState(false);
  const [networkType, setNetworkType] = useState<
    "Polygon" | "ERC 20" | "BNB chain"
  >("BNB chain");

  const WITHDRAW = [
    {
      title: "BNB chain",
      desc: (
        <>
          <div>Free</div>
        </>
      ),
      handler: () => setNetworkType("BNB chain"),
    },
    {
      title: "Polygon",
      desc: (
        <>
          <div>Free 1.00 USDT</div>
          <div>Minimum withdrawal 10 USDT</div>
          <div>Arrival time = 2 mins</div>
        </>
      ),
      handler: () => setNetworkType("Polygon"),
    },
    {
      title: "ERC 20",
      desc: (
        <>
          <div>Free 1.00 USDT</div>
          <div>Minimum withdrawal 10 USDT</div>
          <div>Arrival time = 2 mins</div>
        </>
      ),
      handler: () => setNetworkType("ERC 20"),
    },
  ];

  const networkContentRef = useRef<HTMLDivElement | null>(null);
  const handleClickOutside = useCallback(() => {
    if (!networkContentRef.current || !isShowOptions) return false;
    setIsShowOptions(false);
  }, [isShowOptions]);
  useOnClickOutside(networkContentRef, handleClickOutside);

  return (
    <>
      <Modal
        title="Withdraw with AXB"
        open={props.open}
        onCancel={() => props.onCancel(false)}
        className="withdraw-axb"
      >
        <div className="withdraw-axb-content">
          <div className="group-field">
            <div className="group-field-title">Address</div>
            <div className="group-field-qr">
              <input placeholder="Type something" />
              <img
                src={require("@/assets/images/withdraw_axb.png")}
                alt="Withdraw with AXB"
              />
            </div>
          </div>
          <div className="withdraw-axb-content-network" ref={networkContentRef}>
            <div className="group-field">
              <div className="group-field-title">Network</div>
              <div
                className="group-field-select"
                onClick={() => setIsShowOptions(!isShowOptions)}
              >
                <span>{networkType}</span>
                <span className="custom-arrow">
                  <IconArrowLeftBold />
                </span>
              </div>
            </div>
            {isShowOptions && (
              <div className="withdraw-axb-content-box">
                {WITHDRAW.map((item) => (
                  <div
                    key={`key-${item.title}`}
                    className="withdraw-axb-content-box-item"
                    onClick={() => {
                      item.handler();
                      setIsShowOptions(!isShowOptions);
                    }}
                  >
                    <div className="withdraw-axb-content-box-item-title">
                      {item.title}
                    </div>
                    <div className="withdraw-axb-content-box-item-des">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="group-field">
            <div className="group-field-title">Withdrawal Amount</div>
            <div className="group-field-input">
              <input placeholder="Type something" />
              <div className="group-field-input-prefix">
                <span>AXB</span>
                <span>Max</span>
              </div>
            </div>
          </div>
          <div className="withdraw-axb-content-btn">
            <button
              className="buy-axb-content-btn-back"
              onClick={() => props.onCancel(false)}
            >
              <IconArrowLeft />
              <span>Back</span>
            </button>
            <button
              className="buy-axb-content-btn-buy"
              onClick={() => setOpenWithdrawSuccessModal(true)}
            >
              <span>Buy</span>
              <IconArrowLeft />
            </button>
          </div>
        </div>
      </Modal>
      <WithdrawSuccessModal
        open={openWithdrawSuccessModal}
        onCancel={setOpenWithdrawSuccessModal}
      />
    </>
  );
};

export default WithdrawWithAXBModal;
