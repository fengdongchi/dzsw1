package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TBaMembeAddrInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/12/1.
 */
public class MembeAddrInfoupdateAction extends ActionSupport{
    private boolean success;
    private boolean failse;
    private String message;
    private TBaMembeAddrInfo memadd;
    @Resource
    private BaseDAO<TBaMembeAddrInfo> dao;
    public String update(){
        dao.update(memadd);
        setSuccess(true);
        setFailse(true);
        setMessage("修改成功！");
        return SUCCESS;
    }

    public TBaMembeAddrInfo getMemadd() {
        return memadd;
    }

    public void setMemadd(TBaMembeAddrInfo memadd) {
        this.memadd = memadd;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isFailse() {
        return failse;
    }

    public void setFailse(boolean failse) {
        this.failse = failse;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
