const Profile = () => {
    return (
        <>
            <h1 className="profile-title">Thông tin của tôi</h1>
            <div className="profile-field">
                <label htmlFor="fullName" className="input_label-field-profile">
                    Họ Tên
                </label>
                <input type="text" name="fullName" className="input-profile-infield" />
            </div>
            <div className="profile-field">
                <label htmlFor="address" className="input_label-field-profile">
                    Địa chỉ
                </label>
                <input type="text" name="address" className="input-profile-infield" />
            </div>
            <div className="profile-field">
                <label htmlFor="phone" className="input_label-field-profile">
                    Số điện thoại
                </label>
                <input type="text" name="phone" className="input-profile-infield" />
            </div>
            <div className="profile-field">
                <label htmlFor="sex" className="input_label-field-profile">
                    Giới tính
                </label>
                <select id="sex" value type="text" name="sex" className="input-profile-infield">
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                </select>
            </div>
        </>
    );
};

export default Profile;
