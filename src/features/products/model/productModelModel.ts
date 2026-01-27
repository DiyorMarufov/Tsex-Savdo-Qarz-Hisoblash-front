import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IEditingProductModel {
  editingProductModelId: any;
}

const initialState: IEditingProductModel = {
  editingProductModelId: null,
};

export const productModelSlice = createSlice({
  name: "product-model",
  initialState,
  reducers: {
    setEditingProductModelId(state, action: PayloadAction<any>) {
      state.editingProductModelId = action.payload;
    },
  },
});

export const { setEditingProductModelId } = productModelSlice.actions;
export default productModelSlice.reducer;
