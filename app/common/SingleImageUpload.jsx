import { FaUpload } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import CustomImage from "./Image";

export const SingleImageUpload = ({
    preview,
    onUpload,
    onRemove,
    inputId = "profile-photo",
    label = "Upload Profile Photo",
}) => {
    return (
        <div className="space-y-3">
            <div className="border-dashed border-2 p-4 rounded-lg text-center border-gray-300">
                <input
                    type="file"
                    name="profilePhoto"
                    accept="image/*"
                    className="hidden"
                    id={inputId}
                    onChange={onUpload}
                />

                <label
                    htmlFor={inputId}
                    className="cursor-pointer flex flex-col items-center gap-2"
                >
                    <FaUpload />
                    <span>{label}</span>
                </label>
            </div>
            {preview && (
                <div className="relative w-24 h-24 mx-auto">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden">
                        <CustomImage
                            src={preview}
                            alt="Preview"
                            fill
                            className="object-cover"
                            sizes="96px"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={onRemove}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                        <FiX size={14} />
                    </button>
                </div>
            )}
        </div>
    );
};