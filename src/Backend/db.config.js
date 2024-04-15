const {Sequelize} = require ('sequelize')



let sequelize= new Sequelize(
process.env.DB_name,process.env.DB_user,process.env.DB_password,{
    host:process.env.DB_host,
    dialect:'mysql',
    logging:false
}
)

module.exports=sequelize