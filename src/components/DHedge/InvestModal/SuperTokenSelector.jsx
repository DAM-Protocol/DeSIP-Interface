import {
	FormControl,
	Input,
	useDisclosure,
	InputGroup,
	InputLeftElement,
	Image,
} from '@chakra-ui/react';
import { useMemo, useEffect, useContext } from 'react';
import { Web3Context } from '../../../context/Web3Context';
import TokenSelector from './TokenSelector';

const SuperTokenSelector = ({
	poolData,
	rateInputRef,
	selectedToken,
	setSelectedToken,
	defaultSelectedToken,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const handleSelect = (token) => {
		setSelectedToken(token);
		onClose();
	};

	const { assetLookup } = useContext(Web3Context);

	const depositSuperTokens = useMemo(() => {
		// array of erc20 token addresses
		const supportedDepositTokens = poolData?.supportedDepositTokens;

		// object with erc20 address key and supertoken address value
		const supportedSuperTokens = poolData?.supportedSuperTokens;

		if (supportedDepositTokens && supportedSuperTokens) {
			// return common supertokens
			return supportedDepositTokens.reduce((acc, curr) => {
				if (supportedSuperTokens[curr]) {
					acc.push({
						address: curr,
						superTokenAddress: supportedSuperTokens[curr],
					});
				}
				return acc;
			}, []);
		} else return [];
	}, [poolData]);

	useEffect(() => {
		let defaultToken;
		if (!selectedToken?.name && assetLookup) {
			if (defaultSelectedToken) {
				defaultToken = depositSuperTokens.find(
					(token) => token.address === defaultSelectedToken
				);
			}
			if (depositSuperTokens?.[0]) {
				defaultToken = depositSuperTokens[0];
			}
			setSelectedToken({
				...defaultToken,
				name: assetLookup[defaultToken?.address],
				symbol: assetLookup?.[defaultToken?.address]?.name,
				icon: assetLookup?.[defaultToken?.address]?.imageURL,
			});
		}
	}, [
		depositSuperTokens,
		selectedToken,
		assetLookup,
		defaultSelectedToken,
		setSelectedToken,
	]);

	return (
		<>
			<TokenSelector
				isOpen={isOpen}
				onClose={onClose}
				handleSelect={handleSelect}
				depositSuperTokens={depositSuperTokens}
				finalFocusRef={rateInputRef}
			/>

			<FormControl>
				<label htmlFor='supertoken'>Super Token</label>
				<InputGroup>
					<InputLeftElement pointerEvents='none' mr='6'>
						<Image
							boxSize={'1.25rem'}
							borderRadius='50%'
							alt='token'
							src={selectedToken?.icon}
							fallbackSrc='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-circle-outline-512.png'
						/>
					</InputLeftElement>

					<Input
						type='text'
						id='supertoken'
						autoComplete='off'
						onClick={onOpen}
						onKeyUp={(e) => {
							if (e.key === 'Enter') e.target.blur();
							if (e.key !== 'Tab' && e.key !== 'Shift' && e.key !== 'Escape')
								onOpen();
						}}
						cursor='pointer'
						onChange={() => {}}
						value={selectedToken ? selectedToken?.symbol + 'x' : ''}
					/>
				</InputGroup>
			</FormControl>
		</>
	);
};

export default SuperTokenSelector;
