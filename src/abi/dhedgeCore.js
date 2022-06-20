export const dhedgeCoreAbi = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'string',
				name: 'message',
				type: 'string',
			},
		],
		name: 'CoreDeactivated',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'string',
				name: 'message',
				type: 'string',
			},
		],
		name: 'CoreReactivated',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'token',
				type: 'address',
			},
		],
		name: 'EmergencyWithdraw',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'contract ISuperToken',
				name: 'superToken',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'user',
				type: 'address',
			},
		],
		name: 'StreamModified',
		type: 'event',
	},
	{
		inputs: [
			{
				internalType: 'contract ISuperToken',
				name: '_superToken',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_agreementClass',
				type: 'address',
			},
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32',
			},
			{
				internalType: 'bytes',
				name: '_agreementData',
				type: 'bytes',
			},
			{
				internalType: 'bytes',
				name: '_cbdata',
				type: 'bytes',
			},
			{
				internalType: 'bytes',
				name: '_ctx',
				type: 'bytes',
			},
		],
		name: 'afterAgreementCreated',
		outputs: [
			{
				internalType: 'bytes',
				name: '_newCtx',
				type: 'bytes',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'contract ISuperToken',
				name: '_superToken',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_agreementClass',
				type: 'address',
			},
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32',
			},
			{
				internalType: 'bytes',
				name: '_agreementData',
				type: 'bytes',
			},
			{
				internalType: 'bytes',
				name: '_cbdata',
				type: 'bytes',
			},
			{
				internalType: 'bytes',
				name: '_ctx',
				type: 'bytes',
			},
		],
		name: 'afterAgreementTerminated',
		outputs: [
			{
				internalType: 'bytes',
				name: '_newCtx',
				type: 'bytes',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'contract ISuperToken',
				name: '_superToken',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_agreementClass',
				type: 'address',
			},
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32',
			},
			{
				internalType: 'bytes',
				name: '_agreementData',
				type: 'bytes',
			},
			{
				internalType: 'bytes',
				name: '_cbdata',
				type: 'bytes',
			},
			{
				internalType: 'bytes',
				name: '_ctx',
				type: 'bytes',
			},
		],
		name: 'afterAgreementUpdated',
		outputs: [
			{
				internalType: 'bytes',
				name: '_newCtx',
				type: 'bytes',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'contract ISuperToken',
				name: '_superToken',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32',
			},
			{
				internalType: 'bytes',
				name: '',
				type: 'bytes',
			},
			{
				internalType: 'bytes',
				name: '',
				type: 'bytes',
			},
		],
		name: 'beforeAgreementCreated',
		outputs: [
			{
				internalType: 'bytes',
				name: '_cbdata',
				type: 'bytes',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'contract ISuperToken',
				name: '_superToken',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_agreementClass',
				type: 'address',
			},
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32',
			},
			{
				internalType: 'bytes',
				name: '_agreementData',
				type: 'bytes',
			},
			{
				internalType: 'bytes',
				name: '',
				type: 'bytes',
			},
		],
		name: 'beforeAgreementTerminated',
		outputs: [
			{
				internalType: 'bytes',
				name: '_cbdata',
				type: 'bytes',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'contract ISuperToken',
				name: '_superToken',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_agreementClass',
				type: 'address',
			},
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32',
			},
			{
				internalType: 'bytes',
				name: '_agreementData',
				type: 'bytes',
			},
			{
				internalType: 'bytes',
				name: '',
				type: 'bytes',
			},
		],
		name: 'beforeAgreementUpdated',
		outputs: [
			{
				internalType: 'bytes',
				name: '_cbdata',
				type: 'bytes',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_user',
				type: 'address',
			},
			{
				internalType: 'contract ISuperToken',
				name: '_superToken',
				type: 'address',
			},
			{
				internalType: 'uint8',
				name: '_streamAction',
				type: 'uint8',
			},
			{
				internalType: 'uint64',
				name: '_delay',
				type: 'uint64',
			},
			{
				internalType: 'int96',
				name: '_flowRate',
				type: 'int96',
			},
		],
		name: 'calcBufferTransferAmount',
		outputs: [
			{
				internalType: 'uint256',
				name: '_transferAmount',
				type: 'uint256',
			},
			{
				internalType: 'bool',
				name: '_isTaken',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_user',
				type: 'address',
			},
			{
				internalType: 'contract ISuperToken',
				name: '_superToken',
				type: 'address',
			},
			{
				internalType: 'uint64',
				name: '_delay',
				type: 'uint64',
			},
		],
		name: 'calcUserUninvested',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'checkCoreActive',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_underlyingToken',
				type: 'address',
			},
		],
		name: 'dHedgeDeposit',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'string',
				name: '_message',
				type: 'string',
			},
		],
		name: 'deactivateCore',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_underlyingToken',
				type: 'address',
			},
		],
		name: 'distribute',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'contract ISuperToken',
				name: '_superToken',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_user',
				type: 'address',
			},
		],
		name: 'emergencyCloseStream',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_token',
				type: 'address',
			},
		],
		name: 'emergencyWithdraw',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_underlyingToken',
				type: 'address',
			},
		],
		name: 'getTokenDistIndices',
		outputs: [
			{
				internalType: 'uint32',
				name: '',
				type: 'uint32',
			},
			{
				internalType: 'uint32',
				name: '',
				type: 'uint32',
			},
			{
				internalType: 'uint32',
				name: '',
				type: 'uint32',
			},
			{
				internalType: 'uint32',
				name: '',
				type: 'uint32',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_user',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_underlyingToken',
				type: 'address',
			},
		],
		name: 'getUserDistIndex',
		outputs: [
			{
				internalType: 'uint32',
				name: '',
				type: 'uint32',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'contract ISuperToken',
				name: '_superToken',
				type: 'address',
			},
		],
		name: 'initStreamToken',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_dHedgePool',
				type: 'address',
			},
			{
				internalType: 'contract ISuperToken',
				name: '_DHPTx',
				type: 'address',
			},
		],
		name: 'initialize',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'string',
				name: '_message',
				type: 'string',
			},
		],
		name: 'reactivateCore',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'requireUpkeep',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
];
