

export const initialState = {
    tests: [],
    total: 0,
    customFields: [],
    grandTotal: 0,
    discount: 0,
    loading: null,
    creating: null,
    total_PC_commision: 0,
    mainCategories: [],
    subCategories: [],
    subCatLoading: null,
    patient: {},
    beddingCharge: 0,
    admittedDays: 0,
    medicineCharge: 0,
    serviceCharge: 0,
    doctors: [],
    selectedDoctor: '',
    pcs: [],
    vatPercentage: '',
    vatAmount: 0,
    paidAmount: 0,
    due: 0,
    refferedBy: '',
};

export function reducer(state, action) {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                loading: action.payload,
            };
        case "SET_SUB_CAT_LOADING":
            return {
                ...state,
                subCatLoading: action.payload,
            };
        case "SET_MAIN_CATEGORIES":
            return {
                ...state,
                mainCategories: action.payload,
            };
        case "SET_SUB_CATEGORIES":
            return {
                ...state,
                subCategories: action.payload,
            };
        case "SET_PATIENT":
            return {
                ...state,
                patient: action.payload,
            };
        case "ADD_TEST": {
            const selectedTestId = action.payload;
            if (state.tests.find((c) => c._id === selectedTestId))
                return
            const test = state.subCategories.find((c) => c._id === selectedTestId);

            return {
                ...state,
                tests: [...state.tests, test],
                total: state?.total + test?.charge,
                grandTotal: state?.total + test?.charge,
                total_PC_commision: state?.total_PC_commision + Math.ceil(test?.charge * test?.pcRate / 100),
                subCategories: state.subCategories.filter(
                    (c) => c._id !== selectedTestId
                ),
            };
        }

        case "REMOVE_TEST": {
            const test = state.tests.find((c) => c._id === action.payload);
            return {
                ...state,
                tests: state.tests.filter((c) => c._id !== action.payload),
                total: state.total - test.charge,
                grandTotal: state.total - test.charge,
                subCategories: [...state.subCategories, test],
            };
        }

        case "ADD_CUSTOM_FIELD": {
            return {
                ...state,
                customFields: [
                    ...state.customFields,
                    {
                        id: state.customFields.length + 1,
                        name: "",
                        amount: 0,
                    },
                ],
            };
        }
        case "UPDATE_CUSTOM_FIELD":
            return {
                ...state,
                customFields: state.customFields.map((field) =>
                    field.id === action.payload.id ? action.payload.updatedField : field
                ),
                total: state.total + action.payload.updatedField.amount,
                grandTotal: state.total + action.payload.updatedField.amount,
            };

        case "REMOVE_CUSTOM_FIELD":
            return {
                ...state,
                customFields: state.customFields.filter(
                    (field) => field.id !== action.payload
                ),
                total: state.total - (state.customFields.find(
                    (field) => field.id === action.payload
                )?.amount || 0),
                grandTotal: state.total - (state.customFields.find(
                    (field) => field.id === action.payload
                )?.amount || 0),

            };
        case "SET_BEDDING_CHARGE": {
            return {
                ...state,
                beddingCharge: action.payload,
                total: state.total + Number(action.payload),
                grandTotal: state.total + Number(action.payload),
            };
        }
        case "REMOVE_BEDDING_CHARGE": {
            return {
                ...state,
                total: state.total - action.payload,
                grandTotal: state.total - action.payload,
                beddingCharge: 0,
            };
        }
        case "SET_ADMITTED_DAYS": {
            return {
                ...state,
                admittedDays: action.payload,
            };
        }
        case "SET_MEDICINE_CHARGE": {
            return {
                ...state,
                total: state.total + Number(action.payload),
                grandTotal: state.total + Number(action.payload),
                medicineCharge: action.payload,
            };
        }
        case "REMOVE_MEDICINE_CHARGE": {
            return {
                ...state,
                total: state.total - action.payload,
                grandTotal: state.total - action.payload,
                medicineCharge: 0,
            };
        }
        case "SET_SERVICE_CHARGE": {
            return {
                ...state,
                total: state.total + Number(action.payload),
                grandTotal: state.total + Number(action.payload),
                serviceCharge: action.payload,
            };
        }

        case "REMOVE_SERVICE_CHARGE": {
            return {
                ...state,
                total: state.total - action.payload,
                grandTotal: state.total - action.payload,
                serviceCharge: 0,
            };
        }

        case "SET_DOCTORS": {
            return {
                ...state,
                doctors: action.payload,
            };
        }
        case "SET_SELECTED_DOCTOR": {
            return {
                ...state,
                selectedDoctor: action.payload,
            };
        }
        case "SET_PCS": {
            return {
                ...state,
                pcs: action.payload,
            };
        }

        case 'SET_VAT_PERCENTAGE':
            const vatAmount = Math.ceil((action.payload) * state.total / 100);
            return {
                ...state,
                vatPercentage: action.payload,
                vatAmount,
                grandTotal: state.total + vatAmount
            };
        case "SET_DISCOUNT": {
            const newDiscount = Number(action.payload);
            return {
                ...state,
                discount: newDiscount,
                grandTotal: (state.total + state.vatAmount) - newDiscount
            };
        }
        case "SET_PAID_AMOUNT": {
            const newPaidAmount = Number(action.payload);
            return {
                ...state,
                paidAmount: newPaidAmount,
                due: state.grandTotal - newPaidAmount
            };
        }
        case "SET_CREATING": {
            return {
                ...state,
                creating: action.payload,
            };
        }
        case "SET_REFFERED_BY": {
            return {
                ...state,
                refferedBy: action.payload,
            };
        }
        default:
            return state;
    }
}