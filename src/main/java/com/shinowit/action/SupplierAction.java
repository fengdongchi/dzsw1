package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TBaSupplierInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-12.
 */
public class SupplierAction extends ActionSupport {
    private TBaSupplierInfo supplier;
    private String message;
    private boolean success;
    private boolean faile;
    @Resource
    private BaseDAO<TBaSupplierInfo> dao;
    public String insert(){
        List<TBaSupplierInfo> list=dao.listAll(TBaSupplierInfo.class);
        for(TBaSupplierInfo u:list){
            if(u.getSupplierName().trim().equals(supplier.getSupplierName().trim())){
                setMessage("该供应商已存在！");
                setSuccess(true);
                setFaile(false);
                return SUCCESS;
            }
        }
        dao.insert(supplier);
        setFaile(true);
        setSuccess(true);
        setMessage("插入成功！");
        return SUCCESS;
    }
    public String delete(){
        dao.delete(supplier);
        setMessage("删除成功!");
        setFaile(true);
        setSuccess(true);
        return SUCCESS;
    }
    public String update(){
        if(supplier.getAddress().trim().length()==0||supplier.getSupplierName().trim().length()==0){
            setFaile(false);
            setSuccess(true);
            setMessage("信息输入有误，请重新输入！");
            return SUCCESS;
        }else{
            dao.update(supplier);
            setMessage("修改成功！");
            setSuccess(true);
            setFaile(true);
            return SUCCESS;
        }
    }

    public TBaSupplierInfo getSupplier() {
        return supplier;
    }

    public void setSupplier(TBaSupplierInfo supplier) {
        this.supplier = supplier;
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
