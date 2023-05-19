

export const initialState = {
    // payments: [],
    tests: [],
    total: 0,
    customFields: [],
    // grandTotal: 0,
    // discount: 0,
    // tax: 0,
    loading: null,
    // creating: null,
    mainCategories: [],
    subCategories: [],
    subCatLoading: null,
    patient: {},
    beddingCharge: 0,
    admittedDays: 0,
    medicineCharge: 0,
    serviceCharge: 0,
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
            };

        case "REMOVE_CUSTOM_FIELD":
            return {
                ...state,
                customFields: state.customFields.filter(
                    (field) => field.id !== action.payload
                ),
            };
        case "SET_BEDDING_CHARGE": {
            return {
                ...state,
                beddingCharge: action.payload,
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
                medicineCharge: action.payload,
            };
        }
        case "SET_SERVICE_CHARGE": {
            return {
                ...state,
                serviceCharge: action.payload,
            };
        }

        // case "SET_TAX": {
        //   const newTax = Number(action.payload.value);
        //   if (newTax > 100) {
        //     toast.error("Tax can't be more than 100%");
        //     action.payload.value = 0;
        //     return state;
        //   }
        //   if (newTax < 0) {
        //     toast.error("Tax can't be less than 0%");
        //     action.payload.value = 0;
        //     return state;
        //   }
        //   return {
        //     ...state,
        //     tax: newTax,
        //   };
        // }
        // case "SET_DISCOUNT": {
        //   const newDiscount = Number(action.payload.value);
        //   if (newDiscount > 100) {
        //     toast.error("Discount can't be more than 100%");
        //     action.payload.value = 0;
        //     return state;
        //   }
        //   if (newDiscount < 0) {
        //     toast.error("Discount can't be less than 0%");
        //     action.payload.value = 0;
        //     return state;
        //   }
        //   return {
        //     ...state,
        //     discount: newDiscount,
        //   };
        // }
        // case "updateGrandTotal": {
        //   const tempTotal = state.total + state.total * (state.tax / 100);
        //   const grandTotal = Math.round(
        //     tempTotal - tempTotal * (state.discount / 100)
        //   );
        //   return {
        //     ...state,
        //     grandTotal,
        //   };
        // }
        // case "CREATING_INVOICE": {
        //   return {
        //     ...state,
        //     creating: action.payload,
        //   };
        // }
        default:
            return state;
    }
}