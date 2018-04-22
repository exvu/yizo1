//模型
module.exports = class Good extends JikeJs.Model {

    constructor(props) {
        super(props);
        this.table("goods");
    }
    /**
     * 获取商品列表
     */
    async list({ search, creater, partner, college, type, state, pageable, pageSize, page, _d }) {

        let total;
        let _where = [];
        if (!this.isUndefined(search)) {
            _where.push({ title: ['like', `%${search}%`] })
        }
        if (!this.isUndefined(creater)) {
            _where.push([
                { create_by: creater }
            ])
        }
        if (!this.isUndefined(partner)) {
            _where.push([
                { user_id: partner }
            ])
        }
        if (!this.isUndefined(partner)) {
            _where.push([
                { college: college }
            ])
        }
        if (!this.isUndefined(type)) {
            _where.push([
                { type_id: type }
            ])
        }
        if (!this.isUndefined(state)) {
            _where.push([
                { state: state }
            ])
        }
        total = await this
            .join('inner join posts on goods.post_id=posts.post_id')
            .join('inner join users on users.user_id=posts.create_by')
            .join('left join good_buy_records on good_buy_records.good_id=goods.good_id')
            .join('left join users u on u.user_id=good_buy_records.user_id')
            .join('inner join post_types on post_types.type_id=posts.type')
            .where(_where)
            .count();
        let list = await this
            .field('posts.post_id as pid,post_title as title,post_content as content,create_by as createId,users.nick_name as createName,users.user_gender as createGender,posts.type as tid,post_types.type_name as tName,posts.college as cid,colleges.college_name as cName,good_number as number,good_price as price,original_price as oprice,images,goods.state,goods._c')
            .join('inner join posts on goods.post_id=posts.post_id')
            .join('inner join users on users.user_id=posts.create_by')
            .join('left join good_buy_records on good_buy_records.good_id=goods.good_id')
            .join('left join users u on u.user_id=good_buy_records.user_id')
            .join('inner join post_types on post_types.type_id=posts.type')
            .join('inner join colleges on colleges.college_id=posts.college')
            .where(_where)
            .page(page - 1, pageSize)
            .select();
        return {
            list,
            pagination: {
                total, pageSize
            }
        }
    }
    /**
     * 添加商品
     */
    async add(user_id, { title, content, college, contact, tel, images, type, price, oprice, number }) {


        //开启事务
        await this.startTrans();
        let { insertId: pid = null } = await this.table("posts").data({
            post_title: title,
            post_content: content,
            create_by: user_id,
            contact,
            contact_tel: tel,
            college,
            type
        }).insert();
        let { insertId: tid = null } = await this.table("goods").data({
            post_id: pid,
            good_number: number,
            good_price: price,
            original_price: oprice,
            images: images.join(',')
        }).insert();
        if (!(pid && tid)) {
            await this.rollback();
            return false;
        }
        await this.commit();
        return pid;
    }

    async updateInfo(id, data) {

        let { affectedRows = 0 } = await this.data(data).update();
        return affectedRows > 0;
    }

    /**
     * 删除
     */
    async del(ids) {
        let { affectedRows = 0 } = await this.where({
            type_id: ['in', ids]
        }).delete();
        return affectedRows > 0;
    }
    /**
     * 禁用
     */
    async disabled(ids) {
        let { affectedRows = 0 } = await this.where({
            type_id: ['in', ids]
        }).data({
            _d: 1
        }).update();
        return affectedRows > 0;
    }
    /**
     * 购买
     */
    async buy(id, { number, user }) {

        let { insertId } = await this.data({
            number,
            user_id: user
        }).insert();
        return insertId;
    }
    async info(id) {
        let info = await this
            .field('goods.post_id as pid,post_title as title,post_content as content,contact,contact_tel,create_by as createId,nick_name as createName,user_gender as createGender,images,post_types.type_id as type,post_types.type_name typeName,posts.college as cid,colleges.college_name as cName,state,good_price as price,original_price as oprice,good_number as number')
            .join('inner join posts on goods.post_id=posts.post_id')
            .join('inner join users on users.user_id=posts.create_by')
            .join("join colleges on colleges.college_id= posts.college")
            .join('inner join post_types on post_types.type_id=posts.type')
            .find();
        if (info) {
            info['images'] = info['images'].split(',');
            info['records'] = await this.table("good_buy_records")
                .field('record_id as id,user_id as user,buy_num as num')
                .join('inner join goods on goods.good_id=good_buy_records.good_id')
                .join('inner join posts on posts.post_id=goods.post_id')·
                .where({
                    "posts.post_id": id
                }).select()
        }

        return info
    }
}