import styled from "@emotion/styled";
import gif1 from "../Images/SuccessCatch.gif";
import gif2 from "../Images/FailCatch.gif";
import Image from "next/Image";

const ModalContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background: rgba(0, 0, 0, 0.4);
	display: flex;
	z-index: 999;
	justify-content: center;
`;

ModalContainer.Modal = styled.div`
	position: absolute;
	top: max(5em, 80px);
	width: 30em;
	max-width: 90%;
	min-width: min(90%, 480px);
	min-height: max(18.5em, 300px);
	max-height: calc(100vh - max(7.5em, 120px));
	padding-top: max(4em, 64px);
	padding-bottom: max(2em, 32px);
	padding-left: max(2.5em, 40px);
	background: transparent;
	display: flex;
	flex-direction: column;
	border-radius: 0.5em;
	justify-content: space-around;
	overflow-y: hidden;
`;

ModalContainer.Body = styled.div`
	margin-top: 0.5em;
	width: 100%;
`;

ModalContainer.Title = styled.div`
	color: red;
	font-size: 20px;
	font-family: NunitoBold;
`;

ModalContainer.ContentTitle = styled.div`
	color: #333;
	text-align: center;
	font-size: 20px;
	font-family: NunitoBold;
`;

ModalContainer.InfoContent = styled.div`
	padding: 0.5em 0;
	margin-top: 0.5em;
	background: white;
	width: 90%;

	@media (max-width: 600px) {
		width: 100%;
	}
`;

const Modal = ({ probability, names, onSubmit, handleChangeName }) => {
	return (
		<ModalContainer>
			<ModalContainer.Modal>
				<ModalContainer.Body>
					{probability > 0.5 ? (
						<>
							<ModalContainer.Title>GOTCHA! </ModalContainer.Title>
							<Image src={gif1} alt={gif1} />
							<ModalContainer.InfoContent>
								<ModalContainer.ContentTitle>
									{" "}
									{names} Was Caught!{" "}
								</ModalContainer.ContentTitle>
								<form onSubmit={onSubmit}>
									<input
										onChange={handleChangeName}
										placeholder="give your new pokemon a name"
										style={{ width: "70%", marginLeft: "20px" }}
										type="text"
										name="name"
									/>
									<input type="submit" value="Submit" />
								</form>
							</ModalContainer.InfoContent>
						</>
					) : (
						<>
							<ModalContainer.Title>fail! </ModalContainer.Title>
							<Image src={gif2} alt={gif2} />
						</>
					)}
				</ModalContainer.Body>
			</ModalContainer.Modal>
		</ModalContainer>
	);
};

export default Modal;
