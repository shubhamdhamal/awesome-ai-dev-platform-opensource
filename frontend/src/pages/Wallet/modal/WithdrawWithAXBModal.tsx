import { useCallback, useEffect, useRef, useState } from "react";
import IconArrowLeft from "@/assets/icons/IconArrowLeft";
import IconArrowLeftBold from "@/assets/icons/IconArrowLeftBold";
import Modal from "@/components/Modal/Modal";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import WithdrawSuccessModal from "./WithdrawSuccessModal";
import "./WithdrawWithAXBModal.scss";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import solanaRPC from "@/solanaRPC";
import { IProvider } from "@web3auth/base";
import { USDC } from "@/utils/solanaAddress";
import { toastError, toastSuccess } from "@/utils/toast";
import { formatOnchainBalance } from "../../../utils/customFormat";
import { isValidSolanaAddress } from "@/utils/validators";
import { confirmDialog } from "@/components/Dialog";
import SolanaRpc from "@/solanaRPC";

type WithdrawWithAXBModalProps = {
  open: boolean;
  onCancel: (open: boolean) => void;
};

const WithdrawWithAXBModal = (props: WithdrawWithAXBModalProps) => {
  const [openWithdrawSuccessModal, setOpenWithdrawSuccessModal] =
    useState(false);
  const [isShowOptions, setIsShowOptions] = useState(false);
  const [networkType, setNetworkType] = useState<"solana" | "usdc">("solana");
  const [onchainBalance, setOnchainBalance] = useState<any>({
    solana: "0",
    usdc: "0",
  });
  const { status, provider } = useWeb3Auth();
  const [withdrawWallet, setWithdrawWallet] = useState<string>("");
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [amount, setAmount] = useState("");
  const [isValidAmount, setIsValidAmount] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        if (!provider) {
          setOnchainBalance({
            solana: "0",
            usdc: "0",
          });
          return;
        }
        if (status === "connected") {
          const rpc = new solanaRPC(provider as IProvider);
          const address = await rpc.getAccounts();
          const [solana, usdc] = await Promise.all([
            rpc.getBalance(),
            rpc.getTokenBalance(address, USDC.address),
          ]);
          setOnchainBalance({
            solana: formatOnchainBalance(solana),
            usdc,
          });
        }
      } catch (error) {
        toastError("Get wallet address failed");
      }
    };

    init();
  }, [provider, status]);

  const WITHDRAW = [
    {
      title: "Solana",
      key: "solana",
      desc: (
        <>
          <div>Current balance: {onchainBalance.solana}</div>
        </>
      ),
      handler: () => setNetworkType("solana"),
    },
    {
      title: "USDC",
      key: "usdc",
      desc: (
        <>
          <div>Current balance: {onchainBalance.usdc}</div>
        </>
      ),
      handler: () => setNetworkType("usdc"),
    },
  ];

  const networkContentRef = useRef<HTMLDivElement | null>(null);
  const handleClickOutside = useCallback(() => {
    if (!networkContentRef.current || !isShowOptions) return false;
    setIsShowOptions(false);
  }, [isShowOptions]);
  useOnClickOutside(networkContentRef, handleClickOutside);

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = event.target.value;
    setWithdrawWallet(newAddress);
    setIsValidAddress(isValidSolanaAddress(newAddress));
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = event.target.value;
    setAmount(newAmount);
    const numericAmount = parseFloat(newAmount);
    const balance = parseFloat(onchainBalance[networkType] || 0); // Assuming onchainBalance is passed as a prop
    setIsValidAmount(
      !isNaN(numericAmount) && numericAmount > 0 && numericAmount <= balance
    );
  };

  const onSubmitWithdraw = async () => {
    confirmDialog({
      message: "Are you sure you want to withdraw?",
      async onSubmit() {
        try {
          if (!provider || status !== "connected") {
            // toastError(
            //   "Wallet is not connected yet. Please connect your wallet."
            // );
            return;
          }
          const solanaRpc = new SolanaRpc(provider); // Assuming provider is passed as a prop
          if (networkType === "solana") {
            await solanaRpc.sendSolTransaction(
              withdrawWallet,
              parseFloat(amount)
            );
            toastSuccess("Withdraw successfully");
            closeModal();
          } else if (networkType === "usdc") {
            await solanaRpc.sendToken(
              withdrawWallet,
              USDC.address,
              parseFloat(amount)
            );
            toastSuccess("Withdraw successfully");
            closeModal();
          }
        } catch (error) {
          toastError("Withdraw failed");
          console.log("withdraw error", error);
        }
      },
    });
  };

  const closeModal = () => {
    setWithdrawWallet("");
    setIsValidAddress(true);
    setAmount("");
    setIsValidAmount(true);
    props.onCancel(false);
  };

  const isButtonDisabled =
    !isValidAddress ||
    !isValidAmount ||
    withdrawWallet.length === 0 ||
    amount.length === 0;

  return (
    <>
      <Modal
        title="Withdraw"
        open={props.open}
        onCancel={() => props.onCancel(false)}
        className="withdraw-axb"
      >
        <div className="withdraw-note">
          Please ensure that you fill in a Solana wallet address for withdrawing these tokens.
        </div>

        <div className="withdraw-axb-content">
          <div className="group-field">
            <div className="group-field-title">Address</div>
            <div className="group-field-qr">
              <input
                className={`custom-input ${isValidAddress ? "" : "invalid"}`}
                placeholder="Input address"
                type="text"
                value={withdrawWallet}
                onChange={handleAddressChange}
              />
              {!isValidAddress && (
                <div className="error-message">Invalid Solana address</div>
              )}
            </div>
          </div>
          <div className="withdraw-axb-content-network" ref={networkContentRef}>
            <div className="group-field">
              <div className="group-field-title">Token</div>
              <div
                className="group-field-select"
                onClick={() => setIsShowOptions(!isShowOptions)}
              >
                <span>
                  {WITHDRAW.find((value) => value.key === networkType)?.title}
                </span>
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
              <input
                className={`custom-input ${isValidAmount ? "" : "invalid"}`}
                placeholder="Input amount"
                type="number"
                value={amount}
                onChange={handleAmountChange}
              />{" "}
              <div className="group-field-input-prefix">
                <span>
                  {WITHDRAW.find((value) => value.key === networkType)?.title}
                </span>
                <span>Max</span>
              </div>
            </div>
            {!isValidAmount && (
              <div className="error-message">Invalid amount</div>
            )}
          </div>
          <div className="withdraw-axb-content-btn">
            <button
              className="buy-axb-content-btn-back"
              onClick={() => closeModal()}
            >
              <IconArrowLeft />
              <span>Back</span>
            </button>
            <button
              disabled={isButtonDisabled}
              className="buy-axb-content-btn-buy"
              onClick={onSubmitWithdraw}
            >
              <span>Withdraw</span>
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
