package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuOperInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-07.
 */
public class MenuInfoAction extends ActionSupport {
    private TAuOperInfo operinfo;
    private String message;
//    private String arry;
    private boolean success;
    private boolean faile;
    @Resource
    private BaseDAO<TAuOperInfo> dao;
    public String insert(){
        List<TAuOperInfo> list=dao.listAll(TAuOperInfo.class);
        for(TAuOperInfo u:list){
            if(u.getOperName().trim().equals(operinfo.getOperName().trim())||operinfo.getPwd().trim().length()==0||operinfo.getOperId().trim().length()==0||operinfo.getLinkTel().trim().length()==0||operinfo.getMobile().trim().length()==0){
                setMessage("该操作员已存在！");
                setSuccess(true);
                setFaile(false);
                return SUCCESS;
            }else{
                dao.insert(operinfo);
                setFaile(true);
                setSuccess(true);
                setMessage("插入成功！");
                return SUCCESS;
            }

        }
            return SUCCESS;
    }
    public String delete(){
            dao.delete(operinfo);
            setMessage("删除成功!");
            setFaile(true);
            setSuccess(true);
            return SUCCESS;
    }
//    public String deletehql() {
//        String[] sArrays = arry.split(",");
//        for (String s : sArrays) {
//            int i = dao.deleteql("delete from TBaSupplierInfo where supplierId=?", Integer.valueOf(s));
//            if (i < 1) {
//                setSuccess(false);
//                setMessage("网络异常删除失败！");
//                return SUCCESS;
//            }
//            if (i == 1) {
//                setSuccess(true);
//                setMessage("删除成功");
//            }
//        }
//        return SUCCESS;
//    }
    public String update(){
        if(operinfo.getPwd().trim().length()==0||operinfo.getOperName().trim().length()==0||operinfo.getLinkTel().trim().length()==0||operinfo.getMobile().trim().length()==0){
            setFaile(false);
            setSuccess(true);
            setMessage("信息输入有误，请重新输入！");
            return SUCCESS;
        }else{
            dao.update(operinfo);
            setMessage("修改成功！");
            setSuccess(true);
            setFaile(true);
            return SUCCESS;
        }
    }

//    public String getArry() {
//        return arry;
//    }
//
//    public void setArry(String arry) {
//        this.arry = arry;
//    }

    public TAuOperInfo getOperinfo() {
        return operinfo;
    }

    public void setOperinfo(TAuOperInfo operinfo) {
        this.operinfo = operinfo;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isFaile() {
        return faile;
    }

    public void setFaile(boolean faile) {
        this.faile = faile;
    }
}
