package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TBaMembeAddrInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/12/1.
 */
public class MembeAddrInfoinsertAction extends ActionSupport{
    private boolean success;
    private boolean failse;
    private String message;
    private TBaMembeAddrInfo memadd;
    private List<TBaMembeAddrInfo> memaddlist;
    @Resource
    private BaseDAO<TBaMembeAddrInfo> dao;
    public String insert(){
        memaddlist=dao.listAll(TBaMembeAddrInfo.class);
        for(TBaMembeAddrInfo u:memaddlist){
            if(u.getId()==memadd.getId()){
                setMessage("该会员信息已存在");
                setSuccess(true);
                setFailse(false);
                return SUCCESS;
            }
        }
        Object obj =dao.insert(memadd);
        if(obj!=null){
            setFailse(true);
            setSuccess(true);
            setMessage("信息插入成功！");
            return SUCCESS;
        }else {
            setFailse(false);
            setSuccess(true);
            setMessage("信息插入成功！");
            return SUCCESS;
        }
    }

    public List<TBaMembeAddrInfo> getMemaddlist() {
        return memaddlist;
    }

    public void setMemaddlist(List<TBaMembeAddrInfo> memaddlist) {
        this.memaddlist = memaddlist;
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
